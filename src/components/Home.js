import React, { useState } from 'react';

// 확장 앱 설치 후 rsc 하면 컴포넌트 알아서 정의 해주고 export 까지 해줌
const Home = ({style}) => {
    // State : Component에 제공하는 상태 값
    // ㄴ 화면 랜더링에 영향 O
    
    // 초기값을 useState 써서 set 해준거라고 생각하면 됨
    const [count, setCount] = useState(1);
    console.log(count);

    const countUp = (e) => {
        setCount(count+1);
    }

    return (
        <>
            <button style={style} onClick={countUp}>{count}</button>
        </>
    );
};

export default Home;