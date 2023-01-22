#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
#define debug(x) cerr<<#x<<" "<<x<<"\n";

bool comp(const pair<int, vector<string>> & data1, const pair<int, vector<string>> & data2){
    return data1.first<data2.first;
}
unordered_set<string> appeared_trade;
int main(){
    string date, date1, date2, time, direction, id, state, message, symbol;
    string order_price, exchange;

    ifstream cin("data.txt");
    ofstream cout("real_data.txt");
    ll i;
    double new_time;
    string increment;
    vector<pair<double, vector<string>>> data;
    ll n=227982;
    // n=500;
    for(i=0;i<n; i++){
        cin>>date>>time>>date1>>date2>>direction>>id>>state>>symbol>>order_price>>exchange;

        //*time
        new_time=stod(time.substr(6,7));
        //changing the seconds to milliseconds
        new_time*=1000;

        //adding the milliseconds to  the minutes
        new_time+=60000*((stod(time.substr(3, 2)))-28);
        increment="true";
        data.push_back({new_time,{state, symbol, increment, exchange, order_price, id}});

    //removes the previously mentionned symbol.
        increment="false";
        data.push_back({new_time, {state, symbol, increment, exchange, order_price, id}});
    }


    sort(data.begin(), data.end(), comp);


}