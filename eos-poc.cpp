#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

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

        //@abi action
        void addtopic(name sender, string question) {
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
        void removetopic(name sender, uint64_t topic_id) {
            // only owner of contract can add topics
            require_auth(_self);

            auto topics_itr = topics.find(topic_id);
            eosio_assert(topics_itr != topics.end(), "Invalid topic id");
            topics.erase(topics_itr);

        };

        //@abi action
        void castvote(uint64_t topic_id, string author, uint8_t yesno, string reason) {
            auto topics_itr = topics.find(topic_id);
            eosio_assert(topics_itr != topics.end(), "Invalid topic id");
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
                vote.author = author;
                vote.yesno = yesno;
                vote.reason = reason;
            });
        };


    private:
        // @abi table
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

        // @abi table
        struct vote {
            uint64_t    id;
            uint64_t    topic_id;
            string      author;
            bool     yesno;
            string      reason;

            uint64_t primary_key()const { return id; }
            EOSLIB_SERIALIZE(vote, (id)(topic_id)(author)(yesno)(reason))
        };
        typedef multi_index<N(vote), vote> vote_index;
        vote_index votes;
};
EOSIO_ABI(slant, (addtopic)(removetopic)(castvote));
