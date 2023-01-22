//!crunching through the new datasets
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
#define debug(x) cout<<#x<<" "<<x<<"\n";

bool comp(const pair<double, vector<string>>& data1, const pair<double, vector<string>>& data2){
    return data1.first<data2.first;
}

int main(){
    ifstream cin("data.txt");
    ofstream cout("final_data.json");
    vector<pair<double, vector<string>>> data;

    double new_time;
    ll i, n=227982, j;
    string curr;
    string state, symbol, exchange, id,order_price;

    set<string> OR;
    set<string> CR;
    set<string> appeared_trade;

    //ind means that the order appeared without having appeared in the previous section...
    bool ind;
    for(i=0;i<n;i++){
        ind=false;
        for(j=0;j<10;j++){
            cin>>curr;
            if(j==1){
                //*time
                new_time=stod(curr.substr(6,7));
                //changing the seconds to milliseconds
                new_time*=1000;

                //adding the milliseconds to  the minutes
                new_time+=60000*((stod(curr.substr(3, 2)))-28);

            }
            else if(j==6){
                if(curr=="NewOrderRequest") {state="OR"; OR.insert(id);}
                //anomaly 1 or normal
                if(curr=="NewOrderAcknowledged") {if(OR.find(id)==OR.end()){state="A1"; ind=true; continue;} else {state="OA";OR.erase(id);}}
                if(curr=="CancelRequest"){ state="CR"; CR.insert(id);}
                //won't remove id from CR, as it might go CA, and CC
                if(curr=="CancelAcknowledged") {if(CR.find(id)==CR.end()){state="A2"; ind=true; continue;} else{state="CA";}}
                if(curr=="Cancelled") {if(CR.find(id)==CR.end()){state="A3";ind=true;continue;} else{state="CC"; CR.erase(id);}};
                if(curr=="Trade") {if(appeared_trade.find(id)==appeared_trade.end());state="TT"; appeared_trade.insert(id);}

            }
            else if(j==7){
                symbol=curr;
            }
            else if(j==9){
                if(curr=="Aequitas") exchange="AQ";
                if(curr=="Alpha") exchange="AP";
                if(curr=="TSX") exchange = "TSX";
            }
            else if(j==8){
                order_price=curr;
            }
            else if(j==5){
                id=curr;
            }
        }

        // //anomaly
        if(ind==true) {
            //if anomaly, then no incrase or decrease!
            data.push_back({new_time, {state, "null", "null", "null", "null", id}});
            continue;
        }

        data.push_back({new_time, {state, symbol, "true", exchange, order_price, id}});
        

        //check to see if appeared previously
        //the remaining, I am setting the decrement
        if(state=="OR") continue;
        //if there is a cancel request, that does mean that one of the pending orders became a request for cancellation
        else if(state=="CR") state="OR";
        else if(state=="CA") state="CR";

        else if(state=="OA") state="OR";

        else if(state=="CC") state = "CA";
        else if(state=="TT") state="OA";

        data.push_back({new_time, {state, symbol, "false", exchange, order_price, id}});

    
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
    i=0;
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
        // if(i==n-1) cout<<"}\n";
        cout<<"},\n";
    }

    cout<<"]\n";

    return 0;
}