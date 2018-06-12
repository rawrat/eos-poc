#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;
using namespace std;

class slant : public contract {
    using contract::contract;
    

    public:
        slant(account_name self)
        :contract(self),
        votes(_self, _self),
        topics(_self, _self)
        {}

        const uint32_t CREDITING_BATCH_SIZE = 10;
        
        //@abi action
        void addtopic(account_name sender, string question) {
            // only owner of contract can add topics
            require_auth(_self);

            auto itr = topics.emplace(_self, [&](auto& topic) {
                topic.id = topics.available_primary_key();
                topic.question = question;
                topic.votes_yes = 0;
                topic.votes_no = 0;
                topic.active = 1;
            });
        };

        //@abi action
        void removetopic(account_name sender, uint64_t topic_id) {
            // only owner of contract can add topics
            require_auth(_self);

            auto topics_itr = topics.find(topic_id);
            eosio_assert(topics_itr != topics.end(), "Invalid topic id");
            topics.erase(topics_itr);

        };

        //@abi action
        void castvote(account_name sender, uint64_t topic_id, uint8_t yesno, string reason) {
            auto topics_itr = topics.find(topic_id);
            eosio_assert(topics_itr != topics.end(), "Invalid topic id ");
            topics.modify(topics_itr, 0, [&](auto &topic) {
                if(yesno) {
                    topic.votes_yes++;
                } else {
                    topic.votes_no++;
                }
            });

            auto votes_itr = votes.emplace(_self, [&](auto& vote) {
                vote.id = votes.available_primary_key();
                vote.topic_id = topic_id;
                vote.author = sender;
                vote.yesno = yesno;
                vote.reason = reason;
            });
            
        };
        
        //@abi action
        void creditokens(account_name sender) {
            require_auth(_self);
            auto credited_idx = votes.template get_index<N(by_credited)>();
            
            std::vector<vote> l;
            uint32_t count = 0;
            for( const auto& item : credited_idx ) {     
                if(count > CREDITING_BATCH_SIZE || item.credited) {
                    break;
                }
                l.push_back(item);
                count++;                 
            }
            
            for (vote item : l) {
                
                action(
                    permission_level{ sender, N(active) },
                    N(slant.token), N(issue),
                    std::make_tuple(item.author, string("1.0000 SLANT"), string("Thank you for voting"))
                 ).send();
                 
                 
                 votes.modify(votes.find(item.id), 0, [&](auto &vote) {
                     vote.credited = true;
                 });
            }

                    
        }


    private:
        // @abi table topic i64
        struct topic {
            uint64_t    id;
            string      question;
            uint64_t    votes_yes;
            uint64_t    votes_no;
            uint8_t     active;

            uint64_t primary_key()const { return id; }
            EOSLIB_SERIALIZE(topic, (id)(question)(votes_yes)(votes_no)(active))
        };
        typedef multi_index<N(topic), topic> topic_index;
        topic_index topics;

        // @abi table vote i64
        struct vote {
            uint64_t    id;
            uint64_t    topic_id;
            account_name author;
            bool     yesno;
            string      reason;
            uint64_t credited = 0; // yes or no but needs to be uint64_t for indexing

            uint64_t primary_key()const { return id; }
            uint64_t bycredited() const { return credited; }
            EOSLIB_SERIALIZE(vote, (id)(topic_id)(author)(yesno)(reason)(credited))
        };
        typedef multi_index<N(vote), vote,
            indexed_by< N(by_credited), const_mem_fun<vote, uint64_t,  &vote::bycredited> >
        > vote_index;
        vote_index votes;
};
EOSIO_ABI(slant, (addtopic)(removetopic)(castvote)(creditokens));
