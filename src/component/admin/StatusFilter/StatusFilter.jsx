import React from 'react';
import './StatusFilter.css';

const StatusFilter = ({ selectedStatus, onStatusChange }) => {
    const statusOptions = [
        { value: 'all', label: 'All', icon: '👥' },
        { value: 'pending', label: 'Pending', icon: '⏳', status: null },
        { value: 'attending', label: 'Attending', icon: '✅', status: 1 },
        { value: 'not', label: 'Not', icon: '❌', status: 0 }
    ];

    return (
        <div className="status-filter">
            <label className="status-filter__label">Filter by status:</label>
            <div className="status-filter__buttons">
                {statusOptions.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        className={`status-filter__button ${
                            (selectedStatus === 'all' && option.value === 'all') ||
                            (selectedStatus === option.status)
                                ? 'status-filter__button--active'
                                : ''
                        }`}
                        onClick={() => onStatusChange(option.status !== undefined ? option.status : 'all')}
                    >
                        <span className="status-filter__icon">{option.icon}</span>
                        <span className="status-filter__label">{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StatusFilter; 