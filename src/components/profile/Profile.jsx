import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  GitHub as GitHubIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [profile] = useState({
    name: "QWAS-zx",
    title: "全栈开发工程师 & 创新技术探索者",
    location: "中国",
    email: "2807224393@qq.com",
    github: "QWAS-zx",
    website: "QWAS-zx.github.io",
    bio: "热衷于探索前沿技术和创新解决方案的开发者。专注于构建用户友好的应用程序，同时不断学习和实践新技术。擅长将复杂问题简化，创造优雅的技术方案。",
    skills: ["React开发", "前端工程化", "UI/UX设计", "技术创新", "问题解决", "持续学习"],
  });

  const handleSkillClick = (event) => {
    const element = event.currentTarget;
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 200);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* 头像和基本信息 */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                margin: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {profile.name[0]}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {profile.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {profile.title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
              <IconButton 
                color="primary" 
                onClick={() => window.location.href = `mailto:${profile.email}`}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                <EmailIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                onClick={() => window.open(`https://github.com/${profile.github}`, '_blank')}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                onClick={() => window.open(`https://${profile.website}`, '_blank')}
                sx={{
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                <LanguageIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <LocationIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="textSecondary">
                {profile.location}
              </Typography>
            </Box>
          </Grid>

          {/* 个人简介和技能 */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              关于我
            </Typography>
            <Typography variant="body1" paragraph>
              {profile.bio}
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              技能专长
            </Typography>
            <Grid container spacing={1}>
              {profile.skills.map((skill, index) => (
                <Grid item key={index}>
                  <Card 
                    variant="outlined" 
                    onClick={handleSkillClick}
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'white',
                      },
                    }}
                  >
                    <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                      <Typography variant="body2">{skill}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      
      {/* 页脚 */}
      <Box 
        component="footer" 
        sx={{ 
          mt: 4, 
          pt: 3,
          pb: 3,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          © {new Date().getFullYear()} QWAS-zx
        </Typography>
        <Divider sx={{ my: 2, width: '50%', mx: 'auto' }} />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Typography 
            variant="body2" 
            component="a"
            href="https://QWAS-zx.github.io"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline'
              }
            }}
          >
            个人博客
          </Typography>
          <Typography 
            variant="body2" 
            component="a"
            href="https://github.com/QWAS-zx"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline'
              }
            }}
          >
            GitHub
          </Typography>
          <Typography 
            variant="body2" 
            component="a"
            href="mailto:2807224393@qq.com"
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline'
              }
            }}
          >
            联系我
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;