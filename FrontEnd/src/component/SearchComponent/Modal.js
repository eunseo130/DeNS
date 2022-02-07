import react from 'react';
import '../../css/modal.css';

export default function Modal(props) {
    const { open, close, header,content,gomessanger } = props;

    return (
        <div className={ open ? 'openModal modal':'modal'}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className='close' onClick={close}>{' '} &times; {' '}</button>
                    </header>
                    <main>{ content}</main>
                    <footer>
                        <button className="close" onClick={ close}>창닫기</button>
                        <button className="close" onClick={ gomessanger}>팀장메신저</button>
                    </footer>
                </section>
            ): null}
        </div>
    )
}