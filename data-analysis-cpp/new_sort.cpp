//!crunching through the new datasets
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
#define debug(x) cout<<#x<<" "<<x<<"\n";

bool comp(const pair<double, vector<string>>& data1, const pair<double, vector<string>>& data2){
    return data1.first<data2.first;
}

int main(){
    //ifstream cin("");
    //ofstream cout("");
    vector<pair<double, vector<string>>> data;

    ll i, n=, j;
    ll new_time;
    string curr;
    string time;
    for(i=0;i<n;i++){
        for(j=0;j<10;j++){
            if(j==1){
                //*time
                new_time=stod(time.substr(6,7));
                //changing the seconds to milliseconds
                new_time*=1000;

                //adding the milliseconds to  the minutes
                new_time+=60000*((stod(time.substr(3, 2)))-28);

            }
        }

        data.insert({new_time, {}})
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
        i++;
        if(i==227981) cout<<"}\n";
        else cout<<"},\n";
    }

    cout<<"]\n";

    return 0;
}