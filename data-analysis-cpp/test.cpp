#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(){
    string date, time, direction, id, state, message, symbol;
    string order_price, exchange;

    ifstream cin("data.txt");
    ofstream cout("good_data2.json");
    ll i;
    double new_time;
    string increment;
    vector<pair<double, vector<string>>> data;
    unordered_map<string, vector<string>> map;
    ll n=227982;
    // n=500;
    for(i=0;i<n; i++){
        cin>>date>>time>>date>>date>>direction>>id>>state>>symbol>>order_price>>exchange;
        if(map.find(id) == map.end()) {
            map.insert({id, vector<string>()});
        }
        map[id].push_back(state);
    }
    for(auto pair : map) {
        vector<string>& list = pair.second;
        unordered_set<string> seen;
        for(int i = 1; i < list.size(); i++) {
            if(list[i] == "Trade" && list[i-1] != "NewOrderRequest") {
                for(string s : list) cout << s << " ";
                cout << endl;
                break;
            }
            seen.insert(list[i]);
        }
    }
}