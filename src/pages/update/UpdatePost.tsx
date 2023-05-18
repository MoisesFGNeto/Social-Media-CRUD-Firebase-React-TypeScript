import { Update } from "./Update";
import { useParams } from "react-router-dom";

export const UpdatePost = () => {
  const { id } = useParams<{ id: string }>();
  return(
    <div>
      <Update id={id ?? ""}/>
    </div>
  )
}