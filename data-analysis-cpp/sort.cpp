#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main(){
    string date, time, direction, id, state, message, symbol;
    string order_price, exchange;

    ifstream cin("data.txt");
    ofstream cout("good_data.json");
    ll i;
    string increment;
    map<string, vector<string>> data;
    for(i=0;i<50; i++){
        cin>>date>>time>>date>>date>>direction>>id>>state>>symbol>>order_price>>exchange;

        //detecting anomalies

        //if everything is right.
        /*
            output to just a json file
            <timestamp (epoch)> <state> - <symbol> - <increment (true/false)> - <exchange> 

            1673015510615758788 - CR - NQGAH - true - AQ 
        */

        increment="true";
        data.insert({time, {state, symbol, increment, exchange}});

        //the remaining, I am setting the decrement
        if(state=="OA") continue;
        //if there is a cancel request, that doesn't change the number of 
        if(state=="CR") continue;
        if(state=="OA"){
            state="OR";
        }

        increment="false";
        data.insert({time, {state, symbol, "increment", exchange}});

    }

    //!use json
    /*
    example:
        {
	timestamp: “1673015510615758788”,
	state: “CR”,
	symbol: “NQGAH”,
	increment: true,
	exchange: “AQ”,
}

    */
    for(auto message: data){
        cout<<'{'<<"\n";
        cout<<"\"timestamp\": \""<<message.first<<"\",\n";
        cout<<"\"state\": \""<<message.second[0]<<"\",\n";
        cout<<"\"symbol\": \""<<message.second[1]<<"\",\n";
        cout<<"\"increment\": \""<<message.second[2]<<"\",\n";
        cout<<"\"exchange\": \""<<message.second[3]<<"\",\n";
        cout<<'}'<<"\n";


    }



}