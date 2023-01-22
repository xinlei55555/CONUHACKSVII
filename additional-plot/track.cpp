#include <bits/stdc++.h>
using namespace std;
#define debug(x) //cerr<<#x<<" "<<x<<"\n";
typedef long long ll;

map<string, vector<ll>> curr;

// void print();

// void print(){
//     //printing a 2d array
//     //240 seconds per 318 symbols
//     //x axis is the time
//     for(auto symbols: curr){
//         fout<<symbols.first<<" ";
//         for(auto volume_per_second:symbols.second){
//             fout<<volume_per_second<<" ";
//         }
//         fout<<"\n";
//     }
// }
int main(){
    //contains symbol and the number of open transactions
    ifstream cin("data.txt");

    ofstream fout("round_plot_data.txt");


    string useless, symbol, time;
    ll i,n=227982, new_time=0, previous_time=0;
    vector<ll>empty(240,0);
    // // n=500;
    for(i=0; i<n;i++){
        debug(previous_time)
        for(int j=0;j<10;j++) {
            if(j==1){
                cin>>time;
                // debug(time)
                new_time=stol(time.substr(6,7));

                //adding the seconds
                new_time+=60*((stod(time.substr(3, 2)))-28);

                //setting a new previous time, which is the last second
                previous_time=floor(new_time);


            }
            else if(j==7) {cin>>symbol; 
                if(curr.find(symbol)==curr.end()){curr[symbol]=empty;}
                curr[symbol][previous_time]++;}   
            else cin>>useless;
        }
        
    }

    //printing the 2d array
    // cout<<"HI";
    for(auto symbols: curr){
        fout<<symbols.first<<" ";
        for(auto volume_per_second:symbols.second){
            fout<<volume_per_second<<" ";
        }
        fout<<"\n";
    }
    
    return 0;
}
