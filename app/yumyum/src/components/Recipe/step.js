import React, {useState, useEffect} from "react";
import "./recipe.css"

function Step(props) {

    const [getStyle,setStyle] = useState({})

    useEffect(() => {
        setStyle({
            display: "inline",
        })
      }, [])


    function handleStyleChange(e){
        e.preventDefault();
        setStyle({display: "none"})
    }

    function finishSteps(){
        

    }

    return (
     
        <div style={getStyle} className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Step {props.data + 1} / {props.length} </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(e)=> handleStyleChange(e)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.val}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={props.countDown}>Previous</button>
                    {props.data === props.length-1 ?
                     <button type="button" className="btn btn-primary" onClick={props.showRating}>Done</button> :
                     <button type="button" className="btn btn-primary" onClick={props.countUp}>Next</button>     
                }
                   
                </div>
            </div>
        </div>
    )
}

export default Step;