import React, { useState, useCallback } from 'react';
import Input from '../../components/Input/Input'; // Ajuste o caminho conforme necessário
import Button from '../../components/Button/Button';
import { useRouter } from 'next/router';
// import useAuth from '../../hooks/useAuth'; // Comente esta linha para remover o erro
import * as C from '../../styles/pages/recover'; // Ajuste o caminho conforme necessário
import Link from 'next/link';

const Recover = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // const { recoverPassword } = useAuth(); // Comente esta linha para remover o erro

  const handleRecover = useCallback(async () => {
    // Lógica de recuperação de senha
    try {
      // await recoverPassword(email); // Comente esta linha para remover o erro
      router.push('/login'); // Redirecionar para a página de login após recuperação
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido');
      }
    }
  }, [email, router]);

  return (
    <C.Container>
      <C.Content>
        <C.Logo src="/assets/logo.png" alt="Logo" />
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
        <C.labelError>{error}</C.labelError>

        <Button text="RECUPERAR SENHA" onClick={handleRecover} />
        <C.LabelSignin>
          <Link href="/login" passHref>
            <C.Strong>FAZER LOGIN NOVAMENTE</C.Strong>
          </Link>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Recover;
