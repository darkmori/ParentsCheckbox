import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';
import ArrowUp from './icons/ArrowUp';
import ArrowDown from './icons/ArrowDown';
import Checkbox from './Checkbox';

const App: React.FC = () => {
  const [parentChecked, setParentChecked] = useState([false, false, false]);
  const [childChecked, setChildChecked] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
  const [isExpanded, setIsExpanded] = useState([false, false, false]);
  const [selectAllDisabled, setSelectAllDisabled] = useState(false);
  const [deselectAllDisabled, setDeselectAllDisabled] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleParentChange = (parentIndex: number, checked: boolean) => {
    const newParentChecked = [...parentChecked];
    newParentChecked[parentIndex] = checked;
    setParentChecked(newParentChecked);

    const newChildChecked = [...childChecked];
    newChildChecked[parentIndex] = newChildChecked[parentIndex].map(() => checked);
    setChildChecked(newChildChecked);
  };

  const handleChildChange = (parentIndex: number, childIndex: number, checked: boolean) => {
    const newChildChecked = [...childChecked];
    newChildChecked[parentIndex][childIndex] = checked;
    setChildChecked(newChildChecked);

    const newParentChecked = [...parentChecked];
    newParentChecked[parentIndex] = newChildChecked[parentIndex].every(Boolean);
    setParentChecked(newParentChecked);
  };

  const toggleExpandCollapse = (parentIndex: number) => {
    const newIsExpanded = [...isExpanded];
    newIsExpanded[parentIndex] = !newIsExpanded[parentIndex];
    setIsExpanded(newIsExpanded);
  };

  const selectAll = () => {
    setParentChecked([true, true, true]);
    setChildChecked(childChecked.map(children => children.map(() => true)));
  };

  const deselectAll = () => {
    setParentChecked([false, false, false]);
    setChildChecked(childChecked.map(children => children.map(() => false)));
  };

  const handleSubmit = () => {
    alert('Submitted!');
    closeModal();
  };

  const handleCancel = () => {
    alert('Cancelled!');
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const allSelected = parentChecked.every(Boolean);
    const noneSelected = parentChecked.every((checked) => !checked) && childChecked.flat().every((checked) => !checked);
    const anySelected = parentChecked.some(Boolean) || childChecked.flat().some(Boolean);

    setSelectAllDisabled(allSelected);
    setDeselectAllDisabled(noneSelected);
    setSubmitDisabled(!anySelected);
  }, [parentChecked, childChecked]);

  return (
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Checkbox Modal"
            ariaHideApp={false}
            className="modal"
            overlayClassName="overlay"
        >
          <div className="control-buttons">
            <div
                className={`button ${selectAllDisabled ? 'disabled' : ''}`}
                onClick={!selectAllDisabled ? selectAll : undefined}
                style={{ marginRight: '10px' }}
            >
              Select All
            </div>
            <div
                className={`button ${deselectAllDisabled ? 'disabled' : ''}`}
                onClick={!deselectAllDisabled ? deselectAll : undefined}
            >
              Deselect All
            </div>
          </div>
          {parentChecked.map((checked, parentIndex) => (
              <div key={parentIndex}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                      label={`Parent Checkbox ${parentIndex + 1}`}
                      checked={checked}
                      onChange={(checked) => handleParentChange(parentIndex, checked)}
                      id={`parent-checkbox-${parentIndex}`}
                  />
                  <div
                      className="button"
                      onClick={() => toggleExpandCollapse(parentIndex)}
                      style={{ marginLeft: '10px' }}
                  >
                    {isExpanded[parentIndex] ? <ArrowUp /> : <ArrowDown />}
                  </div>
                </div>
                {isExpanded[parentIndex] && (
                    <div style={{ marginLeft: 20 }}>
                      {childChecked[parentIndex].map((checked, childIndex) => (
                          <Checkbox
                              key={childIndex}
                              label={`Child Checkbox ${parentIndex + 1}-${childIndex + 1}`}
                              checked={checked}
                              onChange={(checked) => handleChildChange(parentIndex, childIndex, checked)}
                              id={`child-checkbox-${parentIndex}-${childIndex}`}
                          />
                      ))}
                    </div>
                )}
              </div>
          ))}
          <div className="action-buttons">
            <div
                className={`button ${submitDisabled ? 'disabled' : ''}`}
                onClick={!submitDisabled ? handleSubmit : undefined}
                style={{ marginRight: '10px' }}
            >
              Submit
            </div>
            <div className="button" onClick={handleCancel}>
              Cancel
            </div>
          </div>
        </Modal>
      </div>
  );
};

export default App;
