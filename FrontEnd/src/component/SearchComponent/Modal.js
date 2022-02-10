import react, { useEffect } from 'react';
import '../../css/modal.css';
import { TagCloud } from 'react-tagcloud';

export default function Modal(props) {
    const { open, close, header,content,gomessanger,profile_keyword } = props;
    useEffect(() => {
    }, []);

    return (
        <div className={ open ? 'openModal modal':'modal'}>
            {open ? (
                <section>
                    <div>
                    <header>
                        {header}
                        <button className='close' onClick={close}>{' '} &times; {' '}</button>
                        </header>
                
                        {profile_keyword ? <TagCloud minSize={12} maxSize={30} tags={profile_keyword} /> : `설정된 태그가 없습니다`}
                    <main>{ content}</main>
                    <footer>
                        <button className="close" onClick={ close}>창닫기</button>
                        <button className="close" onClick={ gomessanger}>팀장메신저</button>
                        </footer>
                    </div>
                </section>
            ): null}
        </div>
    )
}