#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

bool comp(const pair<int, vector<string>> & data1, const pair<int, vector<string>> & data2){
    return data1.first>data2.first;
}

int main(){
    ifstream cin("data.txt");
    ofstream cout("good_data.json");

    string increment, date, date1, date2, time, direction, id, state, message, symbol, order_price, exchange;

    ll i,j,n=227982;
    vector<vector<string>> arr;
    // n=500;
    //contains id, and 
    unordered_map<string, 
    for(i=0;i<n; i++){
        //cin>>date>>time>>date1>>date2>>direction>>id>>state>>symbol>>order_price>>exchange;
        for(j=0;j<10; j++){
            cin>>arr[i][j];
        }
        //*state
        if(state=="NewOrderRequest") 
        if(state=="NewOrderAcknowledged") 
        if(state=="CancelRequest") 
        if(state=="CancelAcknowledged")
        if(state=="Cancelled") 
        if(state=="Trade") {}
        

    }


    sort(data.begin(), data.end(), comp);
    for(auto x: data){

    }
    return 0;
}