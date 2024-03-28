import axios from "axios";
import { useState } from "react";

export const Home = props => {

    // const navigate = useNavigate();

    const path = "/api"

    // const { path } = props;

    const [posts, setPosts] = useState([]);
    const [data, setData] = useState();
    // console.log(posts)

    axios.get(`${path}/post`).then(res => {
        setPosts(res.data)
    });

    const onChange = e => setData(e.target.value);

    const onClick = () => axios.post(`${path}/regist`, { name: data }).then(res => (res.data)).finally(res => window.alert("登録が涵養しました"));

    const onDelete = post => axios.post(`${path}/postDelete/${post.id}`).then(res => window.location.replace('/'));

    return (
        <div className="container">
            <h1>aaaaaa</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <ul>
                            {posts.map(post => (
                                <li onClick={() => onDelete(post)}>
                                    {post.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <form name="example" onChange={onChange}>
                <input name='name' type='text' />
                <div onClick={onClick}>送信</div>
            </form>
        </div>
    );
}