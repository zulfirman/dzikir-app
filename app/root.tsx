import type {MetaFunction} from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import styles from '../public/assets/css/main.css';

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
});

export function links() {
    return [{rel: "stylesheet", href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'}];
}

export default function App() {
    const mystyle = {
        'font-family': "Segoe UI",
        margin: 'revert'
    };
    return (
        <html lang="en">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body style={mystyle}>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}
