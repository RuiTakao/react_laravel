import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "../components/templates/Layout"
import { AppearanceLayouts } from "../pages/AppearanceLayouts"
import { ItemList } from "../pages/ItemList"
import { Contents } from "../pages/Contents"
import { Test } from "../pages/Test"
import { SlateTest } from "../pages/slateTest"


export const Router = () => {
    const path = "/dev/react_laravel/public/api"
    return (
        <Routes>
            <Route path="dev/react_laravel/public/admin" element={<Navigate replace to="/admin/layouts" />} />
            <Route path="dev/react_laravel/public/admin/layouts" element={
                <Layout>
                    <AppearanceLayouts />
                </Layout>
            } />
            <Route path="admin/item_lists" element={
                <Layout>
                    <ItemList />
                </Layout>
            } />
            <Route path="admin/item_lists/contents/:id" element={
                <Layout>
                    <Contents />
                </Layout>
            } />
            <Route path="dev/react_laravel/public/admin/test" element={
                <Layout>
                    <Test />
                </Layout>
            } />
            <Route path="dev/react_laravel/public/admin/slate" element={
                <Layout>
                    <SlateTest />
                </Layout>
            } />
        </Routes>
    )
}