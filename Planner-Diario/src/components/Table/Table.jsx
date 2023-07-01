import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import './index.scss';

const Table = () => {
  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = (novaTarefa) => {
    const novaTarefaCompleta = { descricao: novaTarefa, status: false };
    setTarefas([...tarefas, novaTarefaCompleta]);
  };

  const deletarTarefa = useCallback((index) => {
    console.log('delete');
    console.log(index);
    ShowModal('deletar', tarefas[index].descricao, index);
  }, [tarefas]);

  const removerTarefa = (index) => {
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    setTarefas(novasTarefas);
  };

  const editarTarefa = useCallback((index) => {
    console.log('edit');
    ShowModal('editar', tarefas[index].descricao);
  }, [tarefas]);

  const mudarStatus = (id) => {
    setTarefas((prevTarefas) => {
      const index = parseInt(id.replace('status', ''));
      const novasTarefas = [...prevTarefas];
      novasTarefas[index].status = !novasTarefas[index].status;
      return novasTarefas;
    });

    const statusAtual = document.getElementById(id);
    if (statusAtual.src.includes('unmarked')) {
      statusAtual.src = './marked-checkbox.svg';
    } else {
      statusAtual.src = './unmarked-checkbox.svg';
    }
  };

  const popularTabela = useCallback(() => {
    const tabelaRows = tarefas.map((tarefa, index) => {
      return (
        <div key={index} className="tBody-row">
          <div className="tBody-cell cell-tarefa">{tarefa.descricao}</div>
          <div className="tBody-cell cell-status">
            <img
              id={`status${index}`}
              src="./unmarked-checkbox.svg"
              alt="checkbox"
              onClick={() => mudarStatus(`status${index}`)}
            />
          </div>
          <div className="tBody-cell cell-opcoes">
            <img
              id={`edit${index}`}
              src="./edit-icon.svg"
              alt="edit"
              onClick={() => editarTarefa(index)}
            />
            <img
              id={`delete${index}`}
              src="./delete-icon.svg"
              alt="delete"
              onClick={() => deletarTarefa(index)}
            />
          </div>
        </div>
      );
    });
    return tabelaRows;
  }, [tarefas, deletarTarefa, editarTarefa]);

  const [tabelaTarefas, setTabelaTarefas] = useState([]);

  useEffect(() => {
    setTabelaTarefas(popularTabela());
  }, [popularTabela, tarefas]);

  const [modalData, setModalData] = useState({ type: '', description: '', index: '' });

  const ShowModal = (type, description, index) => {
    setModalData({ type, description, index });
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  };

  return (
    <div className="tabela-tarefas">
      <div className="tabela-tarefas__content-wrapper">
        <div className="tabela-tarefas__head">
          <div className="tabela-tarefas__tarefa">Tarefa</div>
          <div className="tabela-tarefas__status">Status</div>
          <div className="tabela-tarefas__opcoes">Opções</div>
        </div>
        <div id="tBody" className="tabela-tarefas__body">
          {tabelaTarefas.map((tarefa, index) => tarefa)}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Nova Tarefa..."
            id="task-input"
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                const inputTask = document.getElementById('task-input');
                const valor = inputTask.value;
                if (valor) {
                  adicionarTarefa(valor);
                  inputTask.value = '';
                }
              }
            }}
            className="tabela-tarefas__input"
          />
          <label htmlFor="task-input">
            <img src="./plus.svg" alt="plus" />
          </label>
        </div>
      </div>
      <Modal type={modalData.type} description={modalData.description} index={modalData.index} removerTarefa={removerTarefa} />
    </div>
  );
};

export default Table;
