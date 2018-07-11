# 이진 탐색(Binary Search)

이진 탐색은 정렬된 배열에서 원하는 값을 시간 복잡도 O(logN) 만에 찾아내는 탐색 방법이다. 오름차순으로 정렬된 사이즈가 N인 배열 D에서 원하는 값 k를 찾는 방법은 다음과 같다.

먼저 탐색할 데이터의 범위를 두 개의 인덱스(왼쪽, 오른쪽)로 지정하고 이를 L, R이라고 하자. 정렬되어 있기 때문에 D[L]은 최솟값, D[R]은 최대값이 된다. 당연히 처음 탐색 시에는 전체 영역이므로 L = 0, R = N - 1이다. 이중 중앙값(Median)을 찾아 찾으려는 값 k와 비교한다. 중앙값 M은 (L+R)/2로 구할 수 있다.

![](https://cdn.codeground.org/images/note/algorithm_5-1.jpg)

중앙값인 D[M]과 k를 비교하였을 시, k가 더 크므로 [0, M]범위에는 K값이 존재할 수 없다. 그러므로 L을 M+1로 옮겨주어 [M+1, R] 사이에서 k의 값을 찾도록 하자.

![](https://cdn.codeground.org/images/note/algorithm_5-2.jpg)

아직도 D[M]이 k보다 작기 때문에, L을 M+1로 옮긴다.

![](https://cdn.codeground.org/images/note/algorithm_5-3.jpg)

이 작업을 거친 후에야 D[M]이 k와 같으므로 원하는 값을 찾을 수 있었다. 이와 같이, 중앙값(D[M])과 찾으려는 값을 비교하여 찾으려는 값이 중앙값보다 크다면 L = M+1, 작다면 R = M-1을 한 후 다시 M을 구하는 방법으로 찾으려는 값의 범위를 절반씩 잘라가면서 구하는 방법이 이진 탐색이다.

만약 찾으려는 값이 없다면 L > R이 되어서 탐색을 종료하면 된다. 이 경우에도, 최대한 찾으려는 값과 비슷한 값들을 찾아가기 때문에, 이 점 또한 응용이 가능하다.

이 알고리즘의 시간 복잡도는 쿼리당 O(log N)이기 때문에 탐색 알고리즘 중에서는 가장 빠른 편이다. 정렬 알고리즘 또한 퀵 정렬이나 힙 정렬 알고리즘을 사용하면 더 효율적이다.



## Example

#### 입력

~~~
첫번째 줄에 배열 D의 원소의 수 N,<br>두번째 줄에는 배열 D의 원소가 주어진다.<br>세번째 줄에는 질문의 수 M이 들어오며,<br>네번째 줄 ~ M + 3번째 줄까지 질문 Qi가 들어온다.
~~~

#### 출력

~~~
입력되는 질문이 배열 D에 포함되어 있다면 "exist",<br>그렇지 않다면 "not exist"를 출력한다.
~~~

##### 입력 예시

~~~
8
-3 0 1 4 7 9 11 16
5
15
0
-3
14
100
~~~

##### 출력 예시

~~~
not exist
exist
exist
not exist
not exist
~~~



### C++

~~~c++
#include <iostream>
#include <algorithm>
#define MAX 5005

int d[MAX], n;

bool binarySearch(int val){
    int l = 0, r = n - 1;
    while(l <= r){
        int mid = (l + r)/2;
        if(val == d[mid]) return true;
        else if(val > d[mid]) l = mid + 1;
        else r = mid - 1;
    }
    return false;
}

int main(){
    cin >> n;
    for(int i = 0; i < n; i++){
        cin >> d[i];
    }
    sort(d, d + n);
    int q;
    cin >> q;
    while(q--){
        int x;
        cin >> x;
        if(binarySearch(x)){
            cout << "exist\n";
        }else{
            cout << "not exist\n";
        }
    }
    return 0;
}
~~~

