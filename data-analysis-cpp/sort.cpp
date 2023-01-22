#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
#define debug(x) cerr<<#x<<" "<<x<<"\n";

bool comp(const pair<int, vector<string>> & data1, const pair<int, vector<string>> & data2){
    return data1.first<data2.first;
}
unordered_set<string> appeared_trade;
int main(){
    string date, time, direction, id, state, message, symbol;
    string order_price, exchange;

    ifstream cin("data.txt");
    ofstream cout("good_data1.json");
    ll i;
    double new_time;
    string increment;
    vector<pair<double, vector<string>>> data;
    ll n=227982;
    n=500;
    for(i=0;i<n; i++){
        cin>>date>>time>>date>>date>>direction>>id>>state>>symbol>>order_price>>exchange;
        
        //*state
        if(state=="NewOrderRequest") state="OR";
        if(state=="NewOrderAcknowledged") state="OA";
        if(state=="CancelRequest") state="CR";
        if(state=="CancelAcknowledged") state="CA";
        if(state=="Cancelled") state="CC";
        if(state=="Trade") {if(appeared_trade.find(id)==appeared_trade.end());state="TT"; appeared_trade.insert(id);}

        //*integrating anomalies
        /*
        if(state=="") state="A1";
        */

        //*order_Price 
        if(order_price=="NaN") order_price="null";

        //*exchange
        if(exchange=="Aequitas") exchange="AQ";
        if(exchange=="Alpha") exchange="AP";
        if(exchange=="TSX") exchange = "TSX";

        //*time
        new_time=stod(time.substr(6,7));
        //changing the seconds to milliseconds
        new_time*=1000;

        //adding the milliseconds to  the minutes
        new_time+=60000*((stod(time.substr(3, 2)))-28);
        increment="true";
        data.push_back({new_time,{state, symbol, increment, exchange, order_price, id}});

        //the remaining, I am setting the decrement
        if(state=="OR") continue;
        //if there is a cancel request, that does mean that one of the pending orders became a request for cancellation
        if(state=="CR") state="OR";
        if(state=="CA") state="CR";

        if(state=="OA") state="OR";

        if(state=="CC") state = "CA";
        if(state=="TT") state="OA";

    //removes the previously mentionned symbol.
        increment="false";
        data.push_back({new_time, {state, symbol, increment, exchange, order_price, id}});

        if(i==n-1) {
            debug(new_time)
            debug(time)
        }
    }


    sort(data.begin(), data.end(), comp);
    //!use json
    /*
    example:
        {
	timestamp: “1673015510615758788”,
	state: “CR”,
	symbol: “NQGAH”,
	increment: true,
	exchange: “AQ”,
    order_price: "<null or the price>"
    id: "sdlksflkj",
}

    */
    cout<<'['<<"\n";
    // double fourth;
    for(auto message: data){
        cout<<'{'<<"\n";
        //printing to the milliseconds
        cout<<fixed<<setprecision(0)<<"\"timestamp\": \""<<message.first<<"\",\n";
        cout<<"\"state\": \""<<message.second[0]<<"\",\n";
        cout<<"\"symbol\": \""<<message.second[1]<<"\",\n";
        cout<<"\"increment\": \""<<message.second[2]<<"\",\n";
        cout<<"\"exchange\": \""<<message.second[3]<<"\",\n";
        // fourth=stod(message.second[4]);
        cout<<"\"order price\": \""<<message.second[4]<<"\",\n";
        cout<<"\"id\": \""<<message.second[5]<<"\"\n";

        cout<<"},"<<"\n";
    }

    cout<<']'<<"\n";



}