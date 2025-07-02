import React, { useState, useEffect } from 'react';
import Loader from '../../../loader/Loader';
import './WeddingInfoModal.css';

const WeddingInfoModal = ({ isOpen, onClose, onSubmit, isSubmitting, weddingInfo }) => {
    const [formData, setFormData] = useState({
        husbands_name: '',
        wifes_name: '',
        date: '',
        time: '',
        address: ''
    });

    useEffect(() => {
        if (weddingInfo) {
            setFormData({
                husbands_name: weddingInfo.husbands_name || '',
                wifes_name: weddingInfo.wifes_name || '',
                date: weddingInfo.date || '',
                time: weddingInfo.time || '',
                address: weddingInfo.address || ''
            });
        } else {
            setFormData({
                husbands_name: '',
                wifes_name: '',
                date: '',
                time: '',
                address: ''
            });
        }
    }, [weddingInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Split the form data into couple info and wedding info
        const coupleData = {
            husbands_name: formData.husbands_name,
            wifes_name: formData.wifes_name
        };
        
        const weddingData = {
            date: formData.date,
            time: formData.time,
            address: formData.address
        };
        
        onSubmit({ coupleData, weddingData });
    };

    if (!isOpen) return null;

    const title = 'Edit Wedding Information';
    const submitButtonText = 'Update';

    return (
        <div className="form-modal-overlay">
            <div className="form-modal-content wedding-form">
                <h3>{title}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h4>Couple Information</h4>
                        <div className="form-group">
                            <label htmlFor="husbands_name">Husband's Name</label>
                            <input
                                type="text"
                                id="husbands_name"
                                name="husbands_name"
                                value={formData.husbands_name}
                                onChange={handleChange}
                                placeholder="Enter husband's name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="wifes_name">Wife's Name</label>
                            <input
                                type="text"
                                id="wifes_name"
                                name="wifes_name"
                                value={formData.wifes_name}
                                onChange={handleChange}
                                placeholder="Enter wife's name"
                            />
                        </div>
                    </div>
                    
                    <div className="form-section">
                        <h4>Wedding Details</h4>
                        <div className="form-group">
                            <label htmlFor="date">Wedding Date</label>
                            <textarea
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="Enter wedding date (e.g., December 25, 2024)"
                                rows="2"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Wedding Time</label>
                            <textarea
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="Enter wedding time (e.g., 18:00 or 6:00 PM)"
                                rows="2"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Wedding Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter wedding venue address"
                                rows="2"
                            />
                        </div>
                    </div>
                    
                    <div className="form-modal-actions">
                        <button
                            type="submit"
                            className="form-modal-button confirm"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Loader/> : submitButtonText}
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
        </div>
    );
};

export default WeddingInfoModal; 