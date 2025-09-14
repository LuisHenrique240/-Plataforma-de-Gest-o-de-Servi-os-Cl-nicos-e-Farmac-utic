<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();
$pharmacist = new Pharmacist($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['crf'])) {
            // Buscar farmacêutico por CRF
            handleLogin();
        } else {
            // Listar todos os farmacêuticos
            handleList();
        }
        break;
        
    case 'POST':
        // Cadastrar novo farmacêutico
        handleRegister();
        break;
        
    default:
        errorResponse('Método não suportado', 405);
        break;
}

function handleLogin() {
    global $pharmacist;
    
    $crf = $_GET['crf'];
    
    if (empty($crf)) {
        errorResponse('CRF é obrigatório');
        return;
    }
    
    $result = $pharmacist->findByCrf($crf);
    
    if ($result) {
        // Adicionar idade calculada
        $result['age'] = calculateAge($result['birth_date']);
        $result['birth_date_formatted'] = date('d/m/Y', strtotime($result['birth_date']));
        
        successResponse($result, 'Farmacêutico encontrado');
    } else {
        errorResponse('CRF não encontrado', 404);
    }
}

function handleRegister() {
    global $pharmacist;
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data) {
        errorResponse('Dados inválidos');
        return;
    }
    
    // Validações
    $errors = [];
    
    if (empty(trim($data['name']))) {
        $errors[] = 'Nome é obrigatório';
    }
    
    if (empty($data['birth_date'])) {
        $errors[] = 'Data de nascimento é obrigatória';
    } else {
        $dateError = validateDate($data['birth_date']);
        if ($dateError) {
            $errors[] = $dateError;
        }
    }
    
    if (empty($data['gender']) || !in_array($data['gender'], ['M', 'F', 'O'])) {
        $errors[] = 'Sexo é obrigatório';
    }
    
    if (empty(trim($data['address']))) {
        $errors[] = 'Endereço é obrigatório';
    }
    
    if (empty(trim($data['contact']))) {
        $errors[] = 'Contato é obrigatório';
    } else {
        $phoneError = validatePhone($data['contact']);
        if ($phoneError) {
            $errors[] = $phoneError;
        }
    }
    
    if (!empty($errors)) {
        errorResponse(implode(', ', $errors));
        return;
    }
    
    // Gerar CRF único
    $crf = $pharmacist->generateCrf();
    
    // Definir dados do farmacêutico
    $pharmacist->name = trim($data['name']);
    $pharmacist->birth_date = $data['birth_date'];
    $pharmacist->gender = $data['gender'];
    $pharmacist->address = trim($data['address']);
    $pharmacist->contact = formatPhone($data['contact']);
    $pharmacist->crf = $crf;
    $pharmacist->created_at = date('Y-m-d H:i:s');
    
    if ($pharmacist->create()) {
        $response = [
            'id' => $crf,
            'name' => $pharmacist->name,
            'birth_date' => $pharmacist->birth_date,
            'gender' => $pharmacist->gender,
            'address' => $pharmacist->address,
            'contact' => $pharmacist->contact,
            'crf' => $pharmacist->crf,
            'age' => calculateAge($pharmacist->birth_date),
            'birth_date_formatted' => date('d/m/Y', strtotime($pharmacist->birth_date))
        ];
        
        successResponse($response, 'Farmacêutico cadastrado com sucesso');
    } else {
        errorResponse('Erro ao cadastrar farmacêutico', 500);
    }
}

function handleList() {
    global $pharmacist;
    
    $stmt = $pharmacist->read();
    $pharmacists = [];
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['age'] = calculateAge($row['birth_date']);
        $row['birth_date_formatted'] = date('d/m/Y', strtotime($row['birth_date']));
        $pharmacists[] = $row;
    }
    
    successResponse($pharmacists, 'Lista de farmacêuticos');
}
?>