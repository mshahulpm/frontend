import { Link } from "react-router-dom";


export default function Home() {

    return (
        <div>
            <h2>Home</h2>
            <Link to={'/category'}>Categories</Link>
        </div>
    )
}
