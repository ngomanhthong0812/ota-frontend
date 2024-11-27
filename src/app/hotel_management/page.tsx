import { useState } from "react";
import ToolbarTop from "@/components/general_information/toolbar_top";
import GeneralInformationTable from "@/components/general_information/general_information_table";
import RightPanel from "@/components/general_information/right_panel";

interface IProps { }
const GeneralInformationPage: React.FC<IProps> = () => {
    return (
        <div className="flex relative">
            <div className="flex-1 mr-[45px]">
                <ToolbarTop />
                <GeneralInformationTable />
            </div>
            <RightPanel />
        </div>
    );
}

export default GeneralInformationPage;

