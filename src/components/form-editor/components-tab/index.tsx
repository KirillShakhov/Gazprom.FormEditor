import React from 'react';
import './style.css';
import { Container, Draggable } from 'react-smooth-dnd';
import { IForm, IFormItem } from '../../../interfaces/form-config';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { generateElement, generateGroup, generatePage, generatePageGroup } from '../../../utils/element-generators';
import { IParameter } from '../../../interfaces/parameter';
import { IFormElement } from '../../../interfaces/form-element';
import { isFormControl, isFormGroup, isFormPage, isTabPageController } from '../../../utils/form-config';

interface ComponentsTabProps {
  form: IForm;
  parameters: IParameter[];
  selectedItem: IFormElement | undefined;
  update: () => void;
}

export const ComponentsTab: React.FC<ComponentsTabProps> = (props) => {
  const { form, parameters, selectedItem, update } = props;

  const addPageGroup = () => {
    console.log('addPageGroup');
    addFormItem(generatePageGroup(form));
    update();
  };

  const addPage = () => {
    console.log('addPage');
    if (selectedItem === undefined) return;
    if (isTabPageController(selectedItem)) {
      if (selectedItem.pages === undefined) return;
      selectedItem.pages.push(generatePage(form));
    }
    update();
  };

  const addGroup = () => {
    console.log('addGroup');
    addFormItem(generateGroup(form));
    update();
  };

  const addElement = () => {
    console.log('addElement');
    if (parameters.length < 1) return;
    addFormItem(generateElement(form, parameters[0]));
    update();
  };

  const addFormItem = (item: IFormItem) => {
    if (selectedItem === undefined) {
      if (form.items === undefined) form.items = [];
      form.items.push(item);
      return;
    }
    if (isFormGroup(selectedItem)) {
      if (selectedItem.items === undefined) selectedItem.items = [];
      selectedItem.items.push(item);
    } else if (isFormPage(selectedItem)) {
      if (selectedItem.items === undefined) selectedItem.items = [];
      selectedItem.items.push(item);
    }
  };

  return (
    <div className="tab-item">
      <Container
        getChildPayload={() => {
          return generatePageGroup(form);
        }}
        groupName={'pages-groups'}
        behaviour={'copy'}
        getGhostParent={(): HTMLElement => {
          return document.body;
        }}
      >
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={addPageGroup} />
            Группа страниц
          </div>
        </Draggable>
      </Container>
      <Container
        getChildPayload={() => {
          const page = generatePage(form) as any;
          page.isNew = true;
          return page;
        }}
        groupName={'pages'}
        behaviour={'copy'}
        dragClass={'page-blob'}
        getGhostParent={(): HTMLElement => {
          return document.body;
        }}
      >
        <Draggable className={'page-ghost'}>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={addPage} />
            Страница
          </div>
        </Draggable>
      </Container>
      <Container
        getChildPayload={() => {
          return generateGroup(form);
        }}
        groupName={'groups'}
        behaviour={'copy'}
        getGhostParent={(): HTMLElement => {
          return document.body;
        }}
      >
        <Draggable>
          <div className="component-item">
            <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={addGroup} />
            Группа
          </div>
        </Draggable>
      </Container>
      {parameters?.length > 0 && (
        <Container
          getChildPayload={() => {
            return generateElement(form, parameters[0]);
          }}
          groupName={'parameters'}
          behaviour={'copy'}
          getGhostParent={(): HTMLElement => {
            return document.body;
          }}
        >
          <Draggable>
            <div className="component-item">
              <AddCircleOutlineRoundedIcon style={{ color: '#bcbcd0' }} fontSize={'small'} onClick={addElement} />
              Поле ввода
            </div>
          </Draggable>
        </Container>
      )}
    </div>
  );
};
