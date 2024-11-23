'use client'
import { useAuth } from "@/context/auth.context";

interface IProps { }
const GeneralInformationPage: React.FC<IProps> = () => {
    const { user } = useAuth();

    console.log(user);
    return (
        <div>
            General information
        </div>
    );
}

export default GeneralInformationPage;
