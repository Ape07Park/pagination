
// 함수의 호이스팅: 함수 선언을 코드의 최상단에 가능하게 하는 것  

// 함수 선언식(호이스팅 가능)
function main() {
    console.log('hello');

}

// 함수 표현식(호이스팅 불가), 익명 함수
const main = function () {
    console.log("hello");
}

const main = () => {
    console.log("hello");
}



const add = (a, b) => {
    return a + b
}

// 객체 반환
const getObj = () => {
    return { name: 'jim' }
}

console.log(getObj());


// arguments[index]를 통해 인자에 접근 가능
function main() {
    console.log(arguments[0])
}


main(1, 2, 3)


// 인자
const main = (...args) => {
    console.log(args[2])
}


main(1, 2, 3)


// ---------------------

/**
 * this
 */

// this는 함수를 호출한 객체이다
// window 객체는 전역객체로 인터넷 브라우저 정보를 담고 있음

// 전역적 맥락에서 this는 윈도우 객체를 가리킴


// main이 window 객체에 등록이 됨
function main() {
    console.log(this);
}

// main을 부르는 객체가 window이기에 this는 window 객체가 됨
window.main();


// 
const obj = {
    name: '코딩',
    main: function () {
        console.log(this);
    },
};

// obj의 메소드로서 호출 따라서 this는 obj임
obj.main();



function main() {
    console.log(this);
}


const obj = {
    name: '코딩',
    smallObj: {
        name: '작은 코딩',

    }
};

obj.main = main;

obj.main();

const main2 = obj.main;
// 여기서의 this는 smallObj가 된다.
main2();

function main() {
    console.log(this);
}

// 바인드 하면 this 값이 {name: 'hi'}로 바뀜
const mainBind = main.bind({ name: 'hi' });
mainBind();

const obj = {
    mainBind,
};

obj.mainBind();


// ----------- 화살표 함수 2 --------------------
// 화살표 함수의 this는 자신을 감싸는 스코프인 {}의 것을 가져옴

// 화살표 함수의 this는 함수가 선언된 위치에서 결정되며 호출 방식에 따라 바뀌지는 않음. bind가 있어도 무시함

// const obj = {
//     name: '코딩',
//     main: function () {
//         console.log(this);
//     },
//     mainArrow: () => {
// console.log(this); 여기서 this는 window 객체
// },
// }; 

// obj.mainArrow();

// const obj = {
//     name: '코딩',
//     main: function () {
//         const innerFuntion = function () {
//             console.log(this); // 어떤 객체로 부터 호출된 것이 아니라서 window 객체가 나옴
//         };

//         innerFuntion();
//     }
// }


const obj = {
    name: '코딩',
    main: function () {
        const innerFuntion =  () => {
            console.log(this); // obj 객체를 가져옴. main이 참조하는 객체인 obj를 그대로 가져오기에
        };

        innerFuntion();
    }
}


const obj = {
    name: '코딩',
    main: function () {
        const innerFuntion = function () {
            console.log(this); // 어떤 객체로 부터 호출된 것이 아니라서 window 객체가 나옴
        }.bind({hi:'hi'}); // 일반 함수는 bind로 this가 가리키는 거 지정 가능

        innerFuntion();
    }
}





