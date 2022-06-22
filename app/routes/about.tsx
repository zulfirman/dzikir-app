import {json} from "@remix-run/node";
import {Link, PrefetchPageLinks, useFetcher, useLoaderData} from "@remix-run/react";
import {Outlet} from "@remix-run/react";
// @ts-ignore
import MUIDataTable from "mui-datatables";

import React, {useEffect, useState} from "react";

async function getData() {
    const result = await fetch("http://localhost:8080/api/v1/user");
    const resultGit = await fetch("http://localhost:8080/api/v1/articles/from-react");
    return {
        'user': await result.json(),
        'git': await resultGit.json()
    }
}

export async function loader() {
    return getData()
}

export default function Index() {
    const loaderData = useLoaderData();
    const [gists, setGists] = useState(loaderData);
    useEffect(() => setGists(loaderData), [loaderData]);

    const fetcher = useFetcher();

    useEffect(() => {
        if (fetcher.data) {
            setGists(fetcher.data);
        }
    }, [fetcher.data]);

    function refresh() {
        fetcher.load('/about');
    }

    return (
        <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.4"}}>
            <h1 id={'idH1'}>Welcome to Remix</h1>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="https://remix.run/tutorials/blog"
                        rel="noreferrer"
                    >
                        15m Quickstart Blog Tutorial
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="https://remix.run/tutorials/jokes"
                        rel="noreferrer"
                    >
                        Deep Dive Jokes App Tutorial
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
                        Remix Docs
                    </a>
                </li>
                <li>
                    <Link
                        to="/"
                        title="Remix Jokes"
                        aria-label="Remix Jokes"
                    >Home</Link>
                </li>
                <li>
                    <button type={'button'} className={'btn btn-success'} onClick={refresh}> Refresh Single</button>
                </li>
                <li>
                    {/*https://stackoverflow.com/questions/35978489/how-to-link-to-same-page*/}
                    <Link type={'button'} className={'btn btn-success'} to={{}}>Refresh Current Page</Link>
                </li>
            </ul>
            <Outlet/>
            <MUIDataTable
                title={"Employee List"}
                data={gists['user']['Content']['items']}
                columns={['name', 'username']}
                options={{
                    filterType: 'checkbox',
                    rowsPerPage: 1
                }}
            />
        </div>
    );
}
