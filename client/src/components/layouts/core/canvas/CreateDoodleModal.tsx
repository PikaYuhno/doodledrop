import React, {useState} from 'react';
import {alert} from '../../../../store/alert/actions';
import {ActionCreator} from '../../../../global';
import {connect} from 'react-redux';
import {AlertType} from '../../../../store/alert/types';

type CreateDoodleModalProps = {
    open: boolean;
    onClose: () => void;
    imgStr: string;
} & DispatchProps;

type DispatchProps = {
    alert: ActionCreator<typeof alert>;
}
const CreateDoodleModal: React.FC<CreateDoodleModalProps> = ({open, onClose, imgStr, alert}) => {
    const [title, setTitle] = useState('');
    const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // make request
        const promise = await fetch(`/api/doodles`, {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({image_path: imgStr, title, })
        });
        const jsonRes = await promise.json();
        if (jsonRes.success) {
            alert(jsonRes.message, AlertType.SUCCESS, 3);

        } else {
            alert(jsonRes.message, AlertType.FAIL, 3);
        }
        onClose();
        setTitle('');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    return (
        <div className={`modal ${open && "is-active"}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="doodle-create-card">
                    <div className="card-header" style={{padding: '1.5rem 1.5rem 1rem 1.5rem'}}>
                        <h6 className="title is-size-4">Create Doodle</h6>
                    </div>
                    <div className="card-main">
                        <input type="text" placeholder="Enter a title" className="input" onChange={handleChange} />
                    </div>
                    <div className="card-footer">
                        <button className="button is-fullwidth is-danger is-outline" onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        alert: (...args: Parameters<typeof alert>) => dispatch(alert(...args))
    }
}

export default connect(null, mapDispatchToProps)(CreateDoodleModal);
