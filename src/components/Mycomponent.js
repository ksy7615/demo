import Home from "./Home";

// props
// ㄴ 자식 요소가 부모에게 전달하는 정보(값)

function MyComponent({message}) {
    return (
        // 번들용? 같은 거라고 함
        <>
            <h1>Hello World</h1>
            <p>{message}</p>
            <Home style={{
                "color": "red",
                "backgroundColor": "black",
                "height": "60px",
                "width": "200px",
                "border": "none",
                "borderRadius": "10px",
                "cursor": "pointer"
            }} />
        </>
    );
}

// const MyComponent = () => (

// )

export default MyComponent;