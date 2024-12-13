import RoomList from "@/components/room/room_list";
import ToolbarTop from "@/components/room/toolbar_top";

interface IProps { }
const RoomLayoutPage: React.FC<IProps> = () => {
    return (
        <>
            <ToolbarTop />
            <div className="body_content py-2">
                <RoomList />
            </div>
        </>
    );
}

export default RoomLayoutPage