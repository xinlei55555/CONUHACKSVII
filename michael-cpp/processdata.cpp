//
//  processdata.cpp
//  
//
//  Created by Michael Osuji on 2023-01-22.
//

#include <stdio.h>
#include <bits/stdc++.h>
using namespace std;
struct transaction {
    int difference;
    string orderID;
    string type;
    string symbol;
    string exchange;
}
int main() {
    cout << "hello";
    ifstream myfile ("AlphaData.json");
    string line;
    int startEpoch = 1673015280;
    getline(myfile, line);
    while(getline(myfile, line)) {
        
    }
}
