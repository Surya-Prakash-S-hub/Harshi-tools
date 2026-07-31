import  Navbar  from "./Navbar"
import { InputField } from "./SourceFiled"
import { Footer } from "./Footer"


export const LayoutRenderer = () => {
    return(
        <>
            <Navbar />
            <InputField />
            <Footer />
        </>
    )
}