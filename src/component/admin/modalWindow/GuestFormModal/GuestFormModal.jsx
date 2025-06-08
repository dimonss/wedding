import React, {useState, useEffect} from 'react';
import Loader from '../../../loader/Loader';
import './GuestFormModal.css';

const GuestFormModal = ({isOpen, onClose, onSubmit, isSubmitting, guest, mode = 'create'}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        respStatus: 'null'
    });

    useEffect(() => {
        if (guest) {
            setFormData({
                fullName: guest.fullName || '',
                gender: guest.gender || '',
                respStatus: guest.respStatus === null ? 'null' : guest.respStatus ? '1' : '0'
            });
        } else {
            setFormData({
                fullName: '',
                gender: '',
                respStatus: 'null'
            });
        }
    }, [guest]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            respStatus: formData.respStatus === 'null' ? null : parseInt(formData.respStatus)
        };
        onSubmit(data);
    };

    if (!isOpen) return null;

    const title = mode === 'create' ? 'Add New Guest' : 'Edit Guest';
    const submitButtonText = mode === 'create' ? 'Create' : 'Update';

    return (
        <div className="modal-overlay">
            <div className="modal-content edit-form">
                <h3>{title}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="respStatus">Response Status</label>
                        <select
                            id="respStatus"
                            name="respStatus"
                            value={formData.respStatus}
                            onChange={handleChange}
                        >
                            <option value="null">Pending</option>
                            <option value="1">Attending</option>
                            <option value="0">Not Attending</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button
                            type="submit"
                            className="modal-button confirm"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Loader/> : submitButtonText}
                        </button>
                        <button
                            type="button"
                            className="modal-button cancel"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GuestFormModal; 