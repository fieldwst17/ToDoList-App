import "./Item.css";
import { MdDeleteSweep } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
function Item(props) {
  const { data, deleteTask, editTask } = props;
  return (
    <div className="list-item">
      <p className="title">{data.title}</p>
      <div className="button-container">
        <MdDeleteSweep className="btn-del" onClick={() => deleteTask(data.id)}/>
        <MdEditSquare className="btn-edit" onClick={() => editTask(data.id)}/>
      </div>
    </div>
  );
}

export default Item;
