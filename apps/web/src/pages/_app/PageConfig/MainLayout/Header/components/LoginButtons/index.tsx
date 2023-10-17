import { Group, Button } from '@mantine/core';
import { useRouter } from 'next/router';

const LoginButtons = () => {
  const router = useRouter();

  const handleLogIn = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <Group>
      <Button variant="default" onClick={handleLogIn} size="sm">Log in</Button>
      <Button onClick={handleSignUp} size="sm">Sign up</Button>
    </Group>
  );
};

export default LoginButtons;
