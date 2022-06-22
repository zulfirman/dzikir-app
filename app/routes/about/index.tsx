import {Form, Link, useLoaderData} from "@remix-run/react";

async function getDataNew() {
    const result = await fetch("http://localhost:8080/api/v1/random-hero/aa",{
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2NTU0NDA2ODMsInByb2ZpbGUiOnsiaWQiOjEsInVzZXJuYW1lIjoienVsIiwibmFtZSI6Ilp1bGZpcm1hbiIsImVtYWlsIjoienVsZmlybWFuMDk4QGdtYWlsLmNvbSIsInJlZmVycmFsQ29kZSI6IiIsImNsYXNzIjp7ImlkIjowLCJjbGFzc05hbWUiOiIiLCJpc0FjdGl2ZSI6ZmFsc2V9fX0.hLhixhGcUyqxOGPiC85aOx_7HrbXwMksEGyHHK_KYJs'
        },
    });
    return {
        'random-hero': await result.json(),
    }
}
export async function loader() {
    return getDataNew()
}
export default function Index() {
    const ajk = useLoaderData();
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <h1 className={'mb-5'}>About/Index</h1>
            <p>{JSON.stringify(ajk['random-hero'])}</p>
            <ul>
                <li>
                    <Link
                        to="whoa"
                    >go to whoa </Link>
                </li>
                <li>
                    <Link type={'button'} className={'btn btn-success'} to="/about">Refresh Current Page</Link>
                </li>
            </ul>
        </div>
    );
}
