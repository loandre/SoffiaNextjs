import React, { useState, useCallback } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import * as C from '../../styles/pages/signup';
import Link from 'next/link';

const Signup = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rg, setRg] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [oab, setOab] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const { signup } = useAuth();

    const handleSignup = useCallback(async () => {
        if (!name || !email || !phone || !password || !rg || !cpf || !oab) {
            setError("Preencha todos os campos");
            return;
        }

        try {
            const success = await signup(name, email, phone, password, rg, cpf, oab);
            if (success) {
                alert("Usuário cadastrado com sucesso!");
                router.push("/");
            } else {
                setError("Erro ao cadastrar usuário");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro desconhecido ao cadastrar usuário");
            }
        }
    }, [name, email, phone, password, rg, cpf, oab, signup, router]);

    return (
        <C.Container>
            <C.Content>
                <C.Logo src="/assets/logo.png" alt="Logo" />
                <Input
                    type="text"
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="RG"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="OAB"
                    value={oab}
                    onChange={(e) => setOab(e.target.value)}
                />
                <C.LabelError>{error}</C.LabelError>
                <Button text="INSCREVER-SE" onClick={handleSignup} />
                <C.LabelSignup>
                    Já tem uma conta?
                    <Link href="/login" passHref>
                        <C.Strong>ENTRE</C.Strong>
                    </Link>
                </C.LabelSignup>
            </C.Content>
        </C.Container>
    );
};

export default Signup;
