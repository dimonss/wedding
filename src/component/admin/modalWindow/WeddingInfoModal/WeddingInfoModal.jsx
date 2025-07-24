import React, {useState, useEffect} from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import './WeddingInfoModal.css';

const WeddingInfoModal = ({isOpen, onClose, onSubmit, isSubmitting, weddingInfo}) => {
    const [formData, setFormData] = useState({
        groomName: '',
        brideName: '',
        date: '',
        time: '',
        address: '',
        description: ''
    });

    useEffect(() => {
        if (weddingInfo) {
            setFormData({
                groomName: weddingInfo.groomName || '',
                brideName: weddingInfo.brideName || '',
                date: weddingInfo.date || '',
                time: weddingInfo.time || '',
                address: weddingInfo.address || '',
                description: weddingInfo.description || ''
            });
        }
    }, [weddingInfo]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <ModalPortal isOpen={isOpen}>
            <ModalOverlay isOpen={isOpen} onClose={onClose}>
                <div className="form-modal-content wedding-form">
                    <h3>Edit Wedding Information</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h4>Couple Information</h4>
                            <div className="form-group">
                                <label htmlFor="groomName">Groom Name</label>
                                <input
                                    type="text"
                                    id="groomName"
                                    name="groomName"
                                    value={formData.groomName}
                                    onChange={handleChange}
                                    placeholder="Enter groom's name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="brideName">Bride Name</label>
                                <input
                                    type="text"
                                    id="brideName"
                                    name="brideName"
                                    value={formData.brideName}
                                    onChange={handleChange}
                                    placeholder="Enter bride's name"
                                />
                            </div>
                        </div>
                        
                        <div className="form-section">
                            <h4>Wedding Details</h4>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Time</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter wedding venue address"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter wedding description"
                                />
                            </div>
                        </div>
                        
                        <div className="form-modal-actions">
                            <button
                                type="submit"
                                className="form-modal-button confirm"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Updating...' : 'Update'}
                            </button>
                            <button
                                type="button"
                                className="form-modal-button cancel"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </ModalOverlay>
        </ModalPortal>
    );
};

export default WeddingInfoModal; 