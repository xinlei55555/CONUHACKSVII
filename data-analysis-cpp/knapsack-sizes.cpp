#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
#define debug(x) cout<<#x<<" "<<x<<"\n";

int main(){
    unordered_set<map<string, string>> pending_request;

    ll i, n;
    string id;
    for(i=0;i<n;i++){
        cin>>id;
        pending_request.insert(id);

        pending_request.erase(id);
    }
}

















































































































int main(){

    return 0;
}