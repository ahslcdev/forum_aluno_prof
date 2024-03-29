import Main from "../layout/Main";
import Input from "../components/Input";
import Button from "../components/Button";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
function Salas() {
  const [show, setShow] = useState(false);
  const [salas, setSalas] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();

  const [descricao, setDescricao] = useState();
  const [tags, setTags] = useState();
  const [enter_room, setEnterRoom] = useState();

  async function criarSala(e) {
    e.preventDefault();
    const sala = {
      descricao: descricao,
      tags: tags,
      dono: "1",
    };
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth-token-access"),
      },
      body: JSON.stringify(sala),
    };
    await fetch("http://localhost:8000/sala/", init).then((response) => {
      window.location.href = "/salas/";
    });
  }

  async function checkSala(e) {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth-token-access"),
      },
    };
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8000/sala/" + enter_room,
      init
    );

    response.status === 200
      ? history.push("/salas/" + enter_room)
      : history.push("/salas");
    // console.log(resposta);
  }

  async function getSalas() {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth-token-access"),
      },
    };
    const response = await fetch("http://localhost:8000/get_salas/", init);
    const data = await response.json();
    setSalas(data.salas);
  }

  useEffect(() => {
    getSalas();
    // Atualiza o titulo do documento usando a API do browser
    // document.title = `Você clicou ${count} vezes`;
  }, []);
  const content = (
    <div>
      <div className="card">
        <div className="card-body">
          <form action="" method="GET" onSubmit={(e) => checkSala(e)}>
            <div className="row">
              <div className="col-md-12 mb-3 d-flex justify-content-center">
                <Input
                  name="enter_room"
                  placeHolder="Código da sala"
                  id="enter_room"
                  type="text"
                  text="Entrar em uma sala"
                  onChange={(e) => setEnterRoom(e.target.value)}
                />
              </div>
              <div className="col-md-12 mb-3 d-flex justify-content-center">
                <Button
                  type="submit"
                  text="Entrar na sala"
                  className="btn btn-primary"
                />
              </div>
              <div className="col-md-12 mb-3 text-center">
                <hr />
                <h4>Ou</h4>
                <hr />
              </div>
              <div className="col-md-12 mb-3 text-center">
                <h4>Crie sua própria sala</h4>
                <Button
                  type="submit"
                  text="Criar sala"
                  className="btn btn-outline-primary mt-3"
                  onClick={handleShow}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="card">
          <div className="card-header">Salas disponíveis</div>
          <div className="card-body">
            {salas.map((sala) => (
              <form action="" method="GET" onSubmit={(e) => checkSala(e)}>
                <div>
                  <Button
                    type="submit"
                    className="btn btn-primary mb-3 w-100"
                    text={'Entrar '+sala.id}
                    onClick={(e) => setEnterRoom(sala.id)}
                  />
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form action="" onSubmit={(e) => criarSala(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Criar sala</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              name="create_room"
              placeHolder="Senha da sala"
              id="create_room"
              type="password"
              text="Crie sua própria sala"
            />
            <Input
              name="descricao"
              placeHolder="Descrição da sala"
              id="descricao"
              type="text"
              text="Descreva sua sala"
              onChange={(e) => setDescricao(e.target.value)}
            />
            <Input
              name="tags"
              placeHolder="Tags da sala"
              id="tags"
              type="text"
              text="Insira as TAGS separadas por hifén (-)"
              onChange={(e) => setTags(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" text="Criar" className="btn btn-primary" />
            <Button
              className="btn btn-secondary"
              type="button"
              text="Fechar"
              onClick={handleClose}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
  return <Main content={content} />;
}

export default Salas;
