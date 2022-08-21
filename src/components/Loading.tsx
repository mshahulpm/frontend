import { useEffect, useMemo } from "react";
import NProgress from 'nprogress'


export default function Loading() {

    useMemo(() => {
        NProgress.start();
    }, []);

    useEffect(() => {
        NProgress.done();
    }, []);


    return (
        <div>Loading....</div>
    )
}

