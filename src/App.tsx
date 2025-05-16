import React, { useState } from 'react'
import {
  ChakraProvider,
  Box,
  VStack,
  Input,
  Button,
  Text,
  useToast,
  Container,
  Heading,
  Select,
  HStack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Tooltip,
  Icon,
  FormHelperText,
  IconButton,
  Flex,
  Link,
  Spacer,
  useColorMode,
  Stack,
  useBreakpointValue,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark
} from '@chakra-ui/react'
import { QRCodeCanvas } from 'qrcode.react'
import { 
  InfoIcon, 
  DeleteIcon, 
  MoonIcon, 
  SunIcon, 
  ExternalLinkIcon,
  ChevronUpIcon,
  DownloadIcon
} from '@chakra-ui/icons'
import { FaGithub } from 'react-icons/fa'

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

interface QRCodeDisplayProps {
  text: string
  qrSize: number
  errorLevel: ErrorCorrectionLevel
  fgColor: string
  bgColor: string
  logo: string | null
  padding: number
  borderWidth: number
  borderColor: string
  borderStyle: string
}

const sizeOptions = [
  { value: 128, label: 'Kecil - 128px (untuk tampilan kecil)' },
  { value: 256, label: 'Sedang - 256px (direkomendasikan)' },
  { value: 384, label: 'Besar - 384px (untuk mencetak)' },
  { value: 512, label: 'Ekstra Besar - 512px (resolusi tinggi)' }
]

function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const titleSize = useBreakpointValue({ base: 'sm', md: 'md' })

  return (
    <Box 
      as="header" 
      w="100%" 
      py={3} 
      px={{ base: 4, md: 8 }} 
      bg={bgColor} 
      borderBottom="1px" 
      borderColor={borderColor}
      position="fixed"
      top={0}
      zIndex={10}
    >
      <Flex maxW="container.lg" mx="auto" alignItems="center">
        <Heading size={titleSize}>Generator Kode QR</Heading>
        <Spacer />
        <HStack spacing={{ base: 2, md: 4 }}>
          <Link 
            href="https://github.com/dalamjaringan/QR-Generator" 
            isExternal
            display="flex"
            alignItems="center"
          >
            <Icon as={FaGithub} boxSize={{ base: 5, md: 6 }} />
          </Link>
          <IconButton
            aria-label={`Beralih ke mode ${colorMode === 'light' ? 'gelap' : 'terang'}`}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            size={{ base: 'sm', md: 'md' }}
          />
        </HStack>
      </Flex>
    </Box>
  )
}

function Footer() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box 
      as="footer" 
      w="100%" 
      py={4} 
      px={8} 
      bg={bgColor} 
      borderTop="1px" 
      borderColor={borderColor}
    >
      <Container maxW="container.lg">
        <VStack spacing={2}>
          <Text color={textColor}>
            Dibuat dengan ❤️ menggunakan React dan Chakra UI © <Link href="https://instagram.com/menjelangpadam" isExternal color={textColor}>menjelangpadam</Link>
          </Text>
          <HStack spacing={4}>
            <Link 
              href="https://github.com/dalamjaringan" 
              isExternal
              color={textColor}
              fontSize="sm"
            >
              GitHub <ExternalLinkIcon mx="2px" />
            </Link>
            <Link 
              href="https://react.dev" 
              isExternal
              color={textColor}
              fontSize="sm"
            >
              React <ExternalLinkIcon mx="2px" />
            </Link>
            <Link 
              href="https://chakra-ui.com" 
              isExternal
              color={textColor}
              fontSize="sm"
            >
              Chakra UI <ExternalLinkIcon mx="2px" />
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <IconButton
      aria-label="Gulir ke atas"
      icon={<ChevronUpIcon />}
      size="lg"
      colorScheme="blue"
      position="fixed"
      bottom="20px"
      right="20px"
      display={isVisible ? 'flex' : 'none'}
      onClick={scrollToTop}
      borderRadius="full"
      boxShadow="lg"
      zIndex={10}
    />
  )
}

function QRCodeDisplay({ 
  text, 
  qrSize, 
  errorLevel, 
  fgColor, 
  bgColor, 
  logo,
  padding,
  borderWidth,
  borderColor,
  borderStyle
}: QRCodeDisplayProps) {
  const containerBorderColor = useColorModeValue('gray.200', 'gray.600')
  const shadowColor = useColorModeValue('gray.100', 'gray.700')
  const containerPadding = useBreakpointValue({ base: 4, md: 8 })
  
  return (
    <Box
      position="relative"
      bg={bgColor}
      p={containerPadding}
      borderRadius="xl"
      borderWidth={2}
      borderColor={containerBorderColor}
      boxShadow={`0 4px 12px ${shadowColor}`}
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: `0 6px 16px ${shadowColor}`
      }}
      mx={{ base: 2, md: 0 }}
    >
      <VStack spacing={4}>
        <Box
          bg="white"
          p={padding}
          borderRadius="lg"
          borderWidth={borderWidth}
          borderColor={borderColor}
          borderStyle={borderStyle}
          width="fit-content"
        >
          {text ? (
            <QRCodeCanvas
              value={text}
              size={qrSize}
              level={errorLevel}
              fgColor={fgColor}
              bgColor={bgColor}
              imageSettings={logo ? {
                src: logo,
                height: qrSize * 0.2,
                width: qrSize * 0.2,
                excavate: true,
              } : undefined}
            />
          ) : (
            <Text 
              color="gray.500"
              p={8}
              textAlign="center"
              fontSize={{ base: "md", md: "lg" }}
            >
              Kode QR akan muncul di sini
            </Text>
          )}
        </Box>
        {text && (
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="gray.500"
            textAlign="center"
            px={4}
          >
            Pindai dengan pembaca kode QR untuk menguji
          </Text>
        )}
      </VStack>
    </Box>
  )
}

function App() {
  const [text, setText] = useState('')
  const [qrSize, setQrSize] = useState(256)
  const [fgColor] = useState('#000000')
  const [bgColor] = useState('#FFFFFF')
  const [errorLevel] = useState<ErrorCorrectionLevel>('M')
  const [logo, setLogo] = useState<string | null>(null)
  const [padding, setPadding] = useState(20)
  const [borderWidth, setBorderWidth] = useState(2)
  const [borderColor, setBorderColor] = useState('#E2E8F0')
  const [borderStyle, setBorderStyle] = useState('solid')
  const toast = useToast()

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 500000) { // 500KB limit
        toast({
          title: 'Error',
          description: 'Ukuran file logo harus kurang dari 500KB',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setLogo(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogo(null)
    const fileInput = document.getElementById('logo-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const downloadQR = () => {
    if (!text) {
      toast({
        title: 'Error',
        description: 'Silakan masukkan teks terlebih dahulu',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Create a temporary canvas with padding and border
    const tempCanvas = document.createElement('canvas')
    const qrCanvas = document.querySelector('canvas') as HTMLCanvasElement
    
    if (qrCanvas) {
      // Calculate the new size including padding and border
      const totalPadding = padding * 2
      const totalBorder = borderWidth * 2
      const newWidth = qrCanvas.width + totalPadding + totalBorder
      const newHeight = qrCanvas.height + totalPadding + totalBorder

      // Set the temporary canvas size
      tempCanvas.width = newWidth
      tempCanvas.height = newHeight

      // Get the context for drawing
      const ctx = tempCanvas.getContext('2d')
      
      if (ctx) {
        // Fill background
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, newWidth, newHeight)

        // Draw border if width > 0
        if (borderWidth > 0) {
          ctx.strokeStyle = borderColor
          ctx.lineWidth = borderWidth

          // Handle different border styles
          switch (borderStyle) {
            case 'dashed':
              ctx.setLineDash([borderWidth * 3, borderWidth * 2])
              break
            case 'dotted':
              ctx.setLineDash([borderWidth, borderWidth])
              break
            case 'double':
              // Draw outer border
              ctx.strokeRect(
                borderWidth / 2,
                borderWidth / 2,
                newWidth - borderWidth,
                newHeight - borderWidth
              )
              // Draw inner border
              ctx.strokeRect(
                borderWidth * 2,
                borderWidth * 2,
                newWidth - borderWidth * 4,
                newHeight - borderWidth * 4
              )
              break
            default: // solid
              ctx.setLineDash([])
          }

          // Draw the border (except for 'double' which is already drawn)
          if (borderStyle !== 'double') {
            ctx.strokeRect(
              borderWidth / 2,
              borderWidth / 2,
              newWidth - borderWidth,
              newHeight - borderWidth
            )
          }
        }

        // Draw the QR code in the center
        ctx.drawImage(
          qrCanvas,
          borderWidth + padding,
          borderWidth + padding,
          qrCanvas.width,
          qrCanvas.height
        )

        // Convert to PNG and download
        const pngUrl = tempCanvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream')
        
        const downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = 'qrcode.png'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)

        toast({
          title: 'Berhasil',
          description: 'Kode QR telah diunduh dengan gaya yang dipilih',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <ChakraProvider>
      <Header />
      <Container maxW="container.lg" pt="80px" pb="100px">
        <VStack spacing={8} align="stretch">
          <Box>
            <FormControl>
              <FormLabel>
                Teks atau URL
                <Tooltip label="Masukkan teks atau URL yang ingin Anda ubah menjadi kode QR" aria-label="Tooltip teks">
                  <InfoIcon ml={2} />
                </Tooltip>
              </FormLabel>
              <Input
                placeholder="Masukkan teks atau URL di sini..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <FormHelperText>
                Masukkan teks, URL, atau informasi lain yang ingin Anda konversi menjadi kode QR
              </FormHelperText>
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>
                Ukuran Kode QR
                <Tooltip label="Pilih ukuran kode QR dalam piksel" aria-label="Tooltip ukuran">
                  <InfoIcon ml={2} />
                </Tooltip>
              </FormLabel>
              <Select
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
              >
                {sizeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl>
              <FormLabel>
                Logo (Opsional)
                <Tooltip label="Tambahkan logo ke tengah kode QR" aria-label="Tooltip logo">
                  <InfoIcon ml={2} />
                </Tooltip>
              </FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                display="none"
                id="logo-upload"
              />
              <HStack>
                <Button as="label" htmlFor="logo-upload">
                  Pilih Logo
                </Button>
                {logo && (
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="outline"
                    onClick={removeLogo}
                  >
                    Hapus Logo
                  </Button>
                )}
              </HStack>
              <FormHelperText>
                Format yang didukung: PNG, JPG, GIF (ukuran maks. 1MB)
              </FormHelperText>
            </FormControl>
          </Box>

          <Stack 
            width="100%" 
            spacing={8}
            direction={{ base: 'column', md: 'row' }}
          >
            <FormControl>
              <FormLabel mb={4}>
                Padding QR Code{' '}
                <Tooltip label="Tambahkan ruang di sekitar kode QR">
                  <InfoIcon ml={2} />
                </Tooltip>
              </FormLabel>
              <Box pt={2} pb={1}>
                <Slider
                  value={padding}
                  onChange={(value) => setPadding(value)}
                  min={0}
                  max={100}
                  step={1}
                  aria-label="Padding slider"
                >
                  <SliderMark
                    value={padding}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-10"
                    ml="-6"
                    w="12"
                    fontSize="sm"
                    borderRadius="full"
                    boxShadow="md"
                    p={1}
                  >
                    {padding}px
                  </SliderMark>
                  <SliderTrack bg="blue.100">
                    <SliderFilledTrack bg="gradient.blue" />
                  </SliderTrack>
                  <SliderThumb 
                    boxSize={6} 
                    bg="white" 
                    boxShadow="lg"
                    _hover={{ boxSize: 7 }}
                    transition="all 0.2s"
                  />
                </Slider>
              </Box>
              <FormHelperText mt={2} fontSize="sm" color="gray.600">Padding dalam piksel (0-100)</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel mb={4}>
                Lebar Bingkai{' '}
                <Tooltip label="Atur lebar bingkai di sekitar kode QR">
                  <InfoIcon ml={2} />
                </Tooltip>
              </FormLabel>
              <Box pt={2} pb={1}>
                <Slider
                  value={borderWidth}
                  onChange={(value) => setBorderWidth(value)}
                  min={0}
                  max={10}
                  step={1}
                  aria-label="Border width slider"
                >
                  <SliderMark
                    value={borderWidth}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-10"
                    ml="-6"
                    w="12"
                    fontSize="sm"
                    borderRadius="full"
                    boxShadow="md"
                    p={1}
                  >
                    {borderWidth}px
                  </SliderMark>
                  <SliderTrack bg="blue.100">
                    <SliderFilledTrack bg="gradient.blue" />
                  </SliderTrack>
                  <SliderThumb 
                    boxSize={6} 
                    bg="white" 
                    boxShadow="lg"
                    _hover={{ boxSize: 7 }}
                    transition="all 0.2s"
                  />
                </Slider>
              </Box>
              <FormHelperText mt={2} fontSize="sm" color="gray.600">Lebar bingkai dalam piksel (0-10)</FormHelperText>
            </FormControl>
          </Stack>

          <Stack 
            width="100%" 
            spacing={4}
            direction={{ base: 'column', md: 'row' }}
          >
            <FormControl>
              <FormLabel>
                Warna Bingkai
                <Tooltip label="Pilih warna untuk bingkai kode QR">
                  <InfoIcon ml={2} />
                </Tooltip>
              </FormLabel>
              <Input
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                p={1}
              />
              <FormHelperText>Pilih warna untuk bingkai</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>
                Gaya Bingkai
                <Tooltip label="Pilih gaya bingkai kode QR">
                  <InfoIcon ml={2} />
                </Tooltip>
              </FormLabel>
              <Select
                value={borderStyle}
                onChange={(e) => setBorderStyle(e.target.value)}
              >
                <option value="solid">Solid</option>
                <option value="dashed">Putus-putus</option>
                <option value="dotted">Titik-titik</option>
                <option value="double">Ganda</option>
              </Select>
              <FormHelperText>Pilih gaya tampilan bingkai</FormHelperText>
            </FormControl>
          </Stack>

          {text && (
            <VStack spacing={4} align="center">
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg={useColorModeValue('white', 'gray.800')}
              >
                <QRCodeDisplay
                  text={text}
                  qrSize={qrSize}
                  errorLevel={errorLevel}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  logo={logo}
                  padding={padding}
                  borderWidth={borderWidth}
                  borderColor={borderColor}
                  borderStyle={borderStyle}
                />
              </Box>
              <Button
                colorScheme="blue"
                onClick={downloadQR}
                leftIcon={<DownloadIcon />}
              >
                Unduh Kode QR
              </Button>
            </VStack>
          )}
        </VStack>
      </Container>
      <Footer />
      <ScrollToTopButton />
    </ChakraProvider>
  )
}

export default App 