import './index.scss'

const Modal = ({type, description, realIndex, removerTarefa}) => {
    const textModal = "Deseja "+ type +" esse item?";
    const modal = document.getElementById('modal'); 
    
    const handleClickSim = () => {
      if (type === 'deletar') {
        modal.style.display = 'none';
        const index = realIndex;
        removerTarefa(index); 
      } else {
        modal.style.display = 'none';
      }
    };

  return (
    <div id='modal' className='modal'>
        <h1 className='modal-text'>{textModal}</h1>
        <p>{description}</p>
        <button onClick={() => modal.style.display = 'none'} id='no'>Não</button>
        <button onClick={handleClickSim} id='yes'>Sim</button>
    </div>
  )
}

export default Modal