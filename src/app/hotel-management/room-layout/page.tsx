import RoomList from "@/components/room/room-list";
import ToolbarTop from "@/components/room/toolbar-top";

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