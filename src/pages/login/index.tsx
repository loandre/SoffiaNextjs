import React, { useState, useEffect, useCallback } from 'react';
import Input from '../../components/Input/Input'; // Ajuste o caminho conforme necessário
import Button from '../../components/Button/Button';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth'; // Ajuste o caminho conforme necessário
import * as C from '../../styles/pages/login'; // Ajuste o caminho conforme necessário
import Link from 'next/link'; // Importar o componente Link

// const Signin = () => {
//   const { signin } = useAuth();
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = useCallback(async () => {
//     try {
//       const res = await signin(email, senha);
//       if (res.token) {
//         localStorage.setItem('token', res.token);
//         router.push('/workspace');
//       } else {
//         setError('Erro ao fazer login');
//       }
//     } catch (err) {
//       setError('Erro ao fazer login');
//     }
//   }, [email, senha, signin, router]);

const Signin = () => {
  const { signin } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = useCallback(async () => {
    try {
      const isSuccess = await signin(email, senha);
      if (isSuccess) {
        // Se o login for bem-sucedido, redireciona para '/workspace'
        router.push('/workspace');
      } else {
        // Se o login falhar, define uma mensagem de erro
        setError('Erro ao fazer login');
      }
    } catch (err) {
      // Trata qualquer erro que ocorra durante o processo de login
      setError('Erro ao fazer login');
    }
  }, [email, senha, signin, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && email && senha) {
        handleLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, senha, handleLogin]);

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
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setError('');
          }}
        />
        <C.LabelError>{error}</C.LabelError>
        <Button text="ENTRAR" onClick={handleLogin} />
        <Link href="/recover" passHref>
          <C.ForgotPasswordLink>
            ESQUECEU SUA SENHA?
          </C.ForgotPasswordLink>
        </Link>
        <C.LabelSignup>
          Não tem uma conta?
          <Link href="/signup" passHref>
            <C.Strong>REGISTRE-SE</C.Strong>
          </Link>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
