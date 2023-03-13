import { Outlet, Route, Routes } from "react-router-dom"

export const MemberView = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>The Book Club</h1>
                    <h2>Member</h2>
                   

                    <Outlet />
                </>
            }>
                {/* <Route path="locations" element={<LocationsList />} />

                <Route path="products" element={<ProductContainer />} />

                <Route path="product/create" element={<ProductForm />} />

                <Route path="purchases" element={<PurchasesList />} />

                <Route path="purchase/:productId/create/" element={<PurchaseForm />} />

                <Route path="cart" element={<Cart />} />

                <Route path="inventory" element={<InventoryContainer />} /> */}



            </Route>
        </Routes>
    )
}