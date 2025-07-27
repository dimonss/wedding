import React, {useState, useEffect} from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import './WeddingInfoModal.css';

const WeddingInfoModal = ({isOpen, onClose, onSubmit, isSubmitting, weddingInfo}) => {
    const [formData, setFormData] = useState({
        husbands_name: '',
        wifes_name: '',
        date: '',
        time: '',
        address: '',
        description: ''
    });

    useEffect(() => {
        if (weddingInfo) {
            setFormData({
                husbands_name: weddingInfo.husbands_name || '',
                wifes_name: weddingInfo.wifes_name || '',
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
        
        // Разделяем данные на couple и wedding для отправки на разные endpoints
        const coupleData = {
            husbands_name: formData.husbands_name,
            wifes_name: formData.wifes_name
        };
        
        const weddingData = {
            date: formData.date,
            time: formData.time,
            address: formData.address
        };
        
        // Отправляем данные через onSubmit
        onSubmit({ coupleData, weddingData });
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
                                <label htmlFor="date">Date</label>
                                <textarea
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    placeholder="Enter wedding date (e.g., 14 - го июня 2025 года)"
                                    rows="2"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Time</label>
                                <textarea
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    placeholder="Enter wedding time (e.g., 16:30—17:30 сбор гостей)"
                                    rows="2"
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
                                    rows="3"
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
                                    rows="3"
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