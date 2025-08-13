import React, { useState, useRef } from 'react';
import ModalPortal from '../modalWindow/ModalPortal/ModalPortal';
import ModalOverlay from '../modalWindow/ModalOverlay/ModalOverlay';
import './ExcelActions.css';

const ExcelActions = ({ credentials, onRefresh }) => {
    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importMessage, setImportMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const fileInputRef = useRef(null);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000';

    // Create authorization header
    const getAuthHeaders = () => {
        const authString = `${credentials.username}:${credentials.password}`;
        const base64Auth = btoa(authString);
        return {
            'Authorization': `Basic ${base64Auth}`,
            'Content-Type': 'application/json'
        };
    };

    // Export guests to Excel
    const handleExport = async () => {
        setIsExporting(true);
        setImportMessage('');
        setShowModal(false);

        try {
            const response = await fetch(`${API_BASE_URL}/export/guests`, {
                method: 'GET',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `guests_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                setImportMessage('✅ Export completed successfully!');
            } else {
                const errorData = await response.json();
                setImportMessage(`❌ Export failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Export error:', error);
            setImportMessage(`❌ Export failed: ${error.message}`);
        } finally {
            setIsExporting(false);
        }
    };

    // Download Excel template
    const handleDownloadTemplate = async () => {
        setShowModal(false);
        
        try {
            const response = await fetch(`${API_BASE_URL}/export/template`, {
                method: 'GET',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'guests_import_template.xlsx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                setImportMessage('✅ Template downloaded successfully!');
            } else {
                const errorData = await response.json();
                setImportMessage(`❌ Template download failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Template download error:', error);
            setImportMessage(`❌ Template download failed: ${error.message}`);
        }
    };

    // Import guests from Excel
    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.name.match(/\.(xlsx|xls)$/i)) {
            setImportMessage('❌ Please select a valid Excel file (.xlsx or .xls)');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            setImportMessage('❌ File size must be less than 5MB');
            return;
        }

        setIsImporting(true);
        setImportMessage('📤 Uploading and processing file...');
        setShowModal(false);

        try {
            const formData = new FormData();
            formData.append('excelFile', file);

            const response = await fetch(`${API_BASE_URL}/import/guests`, {
                method: 'POST',
                headers: {
                    'Authorization': getAuthHeaders().Authorization
                },
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                setImportMessage(`✅ Import completed! ${result.data?.message || 'Guests imported successfully'}`);
                
                // Refresh guest list
                if (onRefresh) {
                    onRefresh();
                }
            } else {
                const errorData = await response.json();
                setImportMessage(`❌ Import failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Import error:', error);
            setImportMessage(`❌ Import failed: ${error.message}`);
        } finally {
            setIsImporting(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Open file dialog
    const handleImportClick = () => {
        fileInputRef.current?.click();
        setShowModal(false);
    };

    // Toggle modal
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="excel-actions">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImport}
                style={{ display: 'none' }}
            />

            {/* Main Excel button */}
            <button
                className="excel-main-btn"
                onClick={toggleModal}
                title="Excel Import/Export Operations"
            >
                📊 Excel Operations
            </button>

            {/* Excel Operations Modal using existing components */}
            <ModalPortal isOpen={showModal}>
                <ModalOverlay isOpen={showModal} onClose={closeModal}>
                    <div className="excel-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="excel-modal-header">
                            <h3>📊 Excel Operations</h3>
                            <button className="close-modal-btn" onClick={closeModal}>×</button>
                        </div>
                        
                        <div className="excel-modal-content">
                            {/* Export Section */}
                            <div className="excel-operation-section">
                                <h4>📤 Export Operations</h4>
                                <button
                                    className="excel-operation-btn export-btn"
                                    onClick={handleExport}
                                    disabled={isExporting}
                                >
                                    <span className="btn-icon">📊</span>
                                    <span className="btn-text">
                                        {isExporting ? 'Exporting...' : 'Export to Excel'}
                                    </span>
                                </button>
                                <p className="operation-description">
                                    Download complete guest list as Excel file
                                </p>
                            </div>

                            {/* Template Section */}
                            <div className="excel-operation-section">
                                <h4>📋 Template</h4>
                                <button
                                    className="excel-operation-btn template-btn"
                                    onClick={handleDownloadTemplate}
                                >
                                    <span className="btn-icon">📋</span>
                                    <span className="btn-text">Download Template</span>
                                </button>
                                <p className="operation-description">
                                    Get pre-formatted Excel template for data entry
                                </p>
                            </div>

                            {/* Import Section */}
                            <div className="excel-operation-section">
                                <h4>📥 Import Operations</h4>
                                <button
                                    className="excel-operation-btn import-btn"
                                    onClick={handleImportClick}
                                    disabled={isImporting}
                                >
                                    <span className="btn-icon">📤</span>
                                    <span className="btn-text">
                                        {isImporting ? 'Importing...' : 'Import from Excel'}
                                    </span>
                                </button>
                                <p className="operation-description">
                                    Upload guest data from Excel file
                                </p>
                            </div>
                        </div>
                    </div>
                </ModalOverlay>
            </ModalPortal>

            {/* Import message */}
            {importMessage && (
                <div className={`import-message ${importMessage.includes('✅') ? 'success' : 'error'}`}>
                    {importMessage}
                    {importMessage.includes('✅') && (
                        <button 
                            className="close-message-btn"
                            onClick={() => setImportMessage('')}
                        >
                            ×
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExcelActions; 